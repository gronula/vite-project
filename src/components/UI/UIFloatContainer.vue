<template>
    <slot></slot>

    <Transition :name="transitionName">
        <div
            v-if="visible"
            ref="content"
            class="ui-float-container absolute trs"
            v-bind="contentData"
            @click.stop="">
            <slot name="content"></slot>
        </div>
    </Transition>
</template>

<script>
import { getAllParents, isArrayContainsValue, toNumber, toRawType } from '../../utils/helpers.js';
import { isValueConvertedToNumber } from '../../utils/validators.js';
import positions from './utils/positions.js';

export default {
    name: 'UIFloatContainer',
    data() {
        return {
            activatorElement: null,
            activatorBoundaries: {},
            contentBoundaries: {},
            parentElement: null,
            parentBoundaries: {},
            resizeObserver: null,
        };
    },
    computed: {
        computedOffset() {
            return toNumber(this.offset);
        },
        contentStyles() {
            return {
                'center': this.contentCenterStyles,
                'bottom': this.contentBottomStyles,
                'bottom-end': this.contentBottomEndStyles,
                'bottom-start': this.contentBottomStartStyles,
                'left': this.contentLeftStyles,
                'left-end': this.contentLeftEndStyles,
                'left-start': this.contentLeftStartStyles,
                'right': this.contentRightStyles,
                'right-end': this.contentRightEndStyles,
                'right-start': this.contentRightStartStyles,
                'top': this.contentTopStyles,
                'top-end': this.contentTopEndStyles,
                'top-start': this.contentTopStartStyles,
            };
        },
        contentCoords() {
            return {
                // bottom/bottom-end/bottom-end (outer)/bottom-start/bottom-start (outer)/left-end (outer)/right-end (outer)
                Bottom: this.activatorBoundaries.bottom + this.computedOffset,
                // left-end/right-end
                BottomEdge: this.activatorBoundaries.bottom - this.contentBoundaries.height,
                // bottom (inner)/bottom-end (inner)/bottom-start (inner)/left-end (inner)/right-end (inner)
                BottomInner: this.activatorBoundaries.bottom - this.contentBoundaries.height - this.computedOffset,

                // left/left-end/left-end (outer)/left-start/left-start (outer)/top-start (outer)/bottom-start (outer)
                Left: this.activatorBoundaries.left - this.contentBoundaries.width - this.computedOffset,
                // center/top/bottom
                LeftCenter: this.activatorBoundaries.left + ((this.activatorBoundaries.width - this.contentBoundaries.width) / 2),
                // bottom-start/top-start
                LeftEdge: this.activatorBoundaries.left,
                // bottom-start (inner)/top-start (inner)/left (inner)/left-end (inner)/left-start (inner)
                LeftInner: this.activatorBoundaries.left + this.computedOffset,

                // right/right-end/right-end (outer)/right-start/right-start (outer)/top-end (outer)/bottom-end (outer)
                Right: this.activatorBoundaries.right + this.computedOffset,
                // bottom-end/top-end
                RightEdge: this.activatorBoundaries.right - this.contentBoundaries.width,
                // right (inner)/right-end (inner)/right-start (inner)/top-end (inner)/bottom-end (inner)
                RightInner: this.activatorBoundaries.right - this.contentBoundaries.width - this.computedOffset,

                // top/top-end/top-end (outer)/top-start/top-start (outer)/left-start (outer)/right-start (outer)
                Top: this.activatorBoundaries.top - this.contentBoundaries.height - this.computedOffset,
                // center/left/right
                TopCenter: this.activatorBoundaries.top + ((this.activatorBoundaries.height - this.contentBoundaries.height) / 2),
                // left-start/right-start
                TopEdge: this.activatorBoundaries.top,
                // left-start (inner)/right-start (inner)/top (inner)/top-end (inner)/top-start (inner)
                TopInner: this.activatorBoundaries.top + this.computedOffset,
            };
        },
        contentCenterStyles() {
            return {
                top: `${Math.max(0, this.contentCoords.TopCenter)}px`,
                left: `${Math.max(0, this.contentCoords.LeftCenter)}px`,
            };
        },
        contentBottomStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.BottomInner}px`,
                    left: `${Math.max(0, this.contentCoords.LeftCenter)}px`,
                };
            }

            return {
                top: `${this.contentCoords.Bottom}px`,
                left: `${Math.max(0, this.contentCoords.LeftCenter)}px`,
            };
        },
        contentBottomEndStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.BottomInner}px`,
                    left: `${Math.max(0, this.contentCoords.RightInner)}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Bottom}px`,
                    left: `${this.contentCoords.Right}px`,
                };
            }

            return {
                top: `${this.contentCoords.Bottom}px`,
                left: `${Math.max(0, this.contentCoords.RightEdge)}px`,
            };
        },
        contentBottomStartStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.BottomInner}px`,
                    left: `${this.contentCoords.LeftInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Bottom}px`,
                    left: `${Math.max(0, this.contentCoords.Left)}px`,
                };
            }

            return {
                top: `${this.contentCoords.Bottom}px`,
                left: `${Math.max(0, this.contentCoords.LeftEdge)}px`,
            };
        },
        contentLeftStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopCenter}px`,
                    left: `${this.contentCoords.LeftInner}px`,
                };
            }

            return {
                top: `${Math.max(0, this.contentCoords.TopCenter)}px`,
                left: `${this.contentCoords.Left}px`,
            };
        },
        contentLeftEndStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.BottomInner}px`,
                    left: `${this.contentCoords.LeftInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Bottom}px`,
                    left: `${this.contentCoords.Left}px`,
                };
            }

            return {
                top: `${Math.max(0, this.contentCoords.BottomEdge)}px`,
                left: `${this.contentCoords.Left}px`,
            };
        },
        contentLeftStartStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopInner}px`,
                    left: `${this.contentCoords.LeftInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${Math.max(0, this.contentCoords.Top)}px`,
                    left: `${this.contentCoords.Left}px`,
                };
            }

            return {
                top: `${this.contentCoords.TopEdge}px`,
                left: `${this.contentCoords.Left}px`,
            };
        },
        contentRightStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopCenter}px`,
                    left: `${this.contentCoords.RightInner}px`,
                };
            }

            return {
                top: `${Math.max(0, this.contentCoords.TopCenter)}px`,
                left: `${this.contentCoords.Right}px`,
            };
        },
        contentRightEndStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.BottomInner}px`,
                    left: `${this.contentCoords.RightInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Bottom}px`,
                    left: `${this.contentCoords.Right}px`,
                };
            }

            return {
                top: `${Math.max(0, this.contentCoords.BottomEdge)}px`,
                left: `${this.contentCoords.Right}px`,
            };
        },
        contentRightStartStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopInner}px`,
                    left: `${this.contentCoords.RightInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${Math.max(0, this.contentCoords.Top)}px`,
                    left: `${this.contentCoords.Right}px`,
                };
            }

            return {
                top: `${this.contentCoords.TopEdge}px`,
                left: `${this.contentCoords.Right}px`,
            };
        },
        contentTopStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopInner}px`,
                    left: `${Math.max(0, this.contentCoords.LeftCenter)}px`,
                };
            }

            return {
                top: `${this.contentCoords.Top}px`,
                left: `${Math.max(0, this.contentCoords.LeftCenter)}px`,
            };
        },
        contentTopEndStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopInner}px`,
                    left: `${Math.max(0, this.contentCoords.RightInner)}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Top}px`,
                    left: `${this.contentCoords.Right}px`,
                };
            }

            return {
                top: `${this.contentCoords.Top}px`,
                left: `${Math.max(0, this.contentCoords.RightEdge)}px`,
            };
        },
        contentTopStartStyles() {
            if (this.inner) {
                return {
                    top: `${this.contentCoords.TopInner}px`,
                    left: `${this.contentCoords.LeftInner}px`,
                };
            } else if (this.outer) {
                return {
                    top: `${this.contentCoords.Top}px`,
                    left: `${Math.max(0, this.contentCoords.Left)}px`,
                };
            }

            return {
                top: `${this.contentCoords.Top}px`,
                left: `${Math.max(0, this.contentCoords.LeftEdge)}px`,
            };
        },
        contentData() {
            return {
                class: this.contentClass,
                style: {
                    ...this.contentStyles[this.position],
                    zIndex: this.zIndex,
                },
            };
        },
    },
    emits: {
        'update:visible': null,
    },
    methods: {
        setParentDOMElement() {
            let parent = document.body;

            if (toRawType(this.parentContainer) === 'String') {
                try {
                    parent = document.querySelector(this.parentContainer);
                } catch (error) {
                    console.error(`[UIFloatContainer/getParentDOMElement]: invalid parentContainer ${this.parentContainer}`);
                }
            } else {
                parent = this.parentContainer;
            }

            this.parentElement = parent;

        },
        update() {
            this.resetBoundaries();
            this.calcBoundaries();
        },
        resetBoundaries() {
            this.parentBoundaries = {};
            this.contentBoundaries = {};
            this.activatorBoundaries = {};
        },
        calcBoundaries() {
            this.calcParentBoundaries();
            this.calcContentBoundaries();
            this.calcActivatorBoundaries();
        },
        calcParentBoundaries() {
            if (!this.parentElement) return;

            const {
                bottom,
                height,
                left,
                right,
                top,
                width,
            } = this.parentElement.getBoundingClientRect();
            const {
                scrollHeight,
                scrollLeft,
                scrollTop,
                scrollWidth,
            } = this.parentElement;

            this.parentBoundaries = {
                bottom,
                height,
                left,
                right,
                top,
                width,
                scrollHeight,
                scrollLeft,
                scrollTop,
                scrollWidth,
            };
        },
        calcActivatorBoundaries() {
            if (!this.activatorElement) return;

            const {
                height,
                left,
                top,
                width,
            } = this.activatorElement.getBoundingClientRect();
            const {
                left: parentLeft,
                top: parentTop,
                scrollLeft: parentScrollLeft,
                scrollTop: parentScrollTop,
            } = this.parentBoundaries;

            this.activatorBoundaries = {
                bottom: top + parentScrollTop - parentTop + height,
                height,
                left: left + parentScrollLeft - parentLeft,
                right: left + parentScrollLeft - parentLeft + width,
                top: top + parentScrollTop - parentTop,
                width,
            };
        },
        calcContentBoundaries() {
            if (!this.$refs.content) return;

            const {
                height,
                width,
            } = this.$refs.content.getBoundingClientRect();

            this.contentBoundaries = {
                height,
                width,
            };
        },
        documentClickHandler(e) {
            if (!this.activatorElement.contains(e.target)) {
                this.$emit('update:visible', false);
            }
        },
        documentKeydownHandler(e) {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.$emit('update:visible', false);
            }
        },
        addListeners() {
            if (this.closeOnClickOutside) {
                document.addEventListener('click', this.documentClickHandler);
            }

            if (this.closeOnEscPress) {
                document.addEventListener('keydown', this.documentKeydownHandler);
            }
        },
        removeListeners() {
            if (this.closeOnClickOutside) {
                document.removeEventListener('click', this.documentClickHandler);
            }

            if (this.closeOnEscPress) {
                document.removeEventListener('keydown', this.documentKeydownHandler);
            }
        },
        addObservers() {
            const contentParents = getAllParents(this.$refs.content);
            const activatorParents = getAllParents(this.activatorElement);

            [
                ...new Set([
                    this.activatorElement,
                    this.$refs.content,
                    ...contentParents,
                    ...activatorParents,
                ]),
            ].forEach(el => {
                this.resizeObserver.observe(el);
            });

        },
    },
    props: {
        closeOnClickOutside: {
            type: Boolean,
            default: true,
        },
        closeOnEscPress: {
            type: Boolean,
            default: true,
        },
        contentClass: {
            type: [String, Object, Array],
            default: '',
        },
        inner: {
            type: Boolean,
            default: false,
        },
        offset: {
            type: [Number, String],
            default: 8,
            validator: isValueConvertedToNumber,
        },
        outer: {
            type: Boolean,
            default: false,
        },
        parentContainer: {
            type: [String, HTMLElement],
            default: document.body,
        },
        position: {
            type: String,
            default: 'bottom',
            validator: isArrayContainsValue(positions),
        },
        transitionName: {
            type: String,
            default: 'fade',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        zIndex: {
            type: [Number, String],
            default: 100,
            validator: isValueConvertedToNumber,
        },
    },
    watch: {
        visible: {
            immediate: true,
            async handler(value) {
                await this.$nextTick();

                if (value) {
                    this.setParentDOMElement();
                    this.parentElement.append(this.$refs.content);

                    this.activatorElement = this.$el.nextElementSibling;
                    this.calcBoundaries();
                    this.addListeners();
                    this.addObservers();
                } else {
                    this.resizeObserver.disconnect();
                    this.removeListeners();
                    this.resetBoundaries();
                    this.activatorElement = null;
                    this.parentElement = null;
                }
            },
        },
    },
    created() {
        this.resizeObserver = new ResizeObserver(this.update);
    },
    beforeUnmount() {
        if (this.activatorElement) {
            this.activatorElement.parentElement.append(this.$refs.content);
        }
    },
};
</script>

<style>
.ui-float-container {
    transition-property: opacity, transform;
}
</style>
