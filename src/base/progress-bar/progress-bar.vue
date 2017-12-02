<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart" 
                 @touchmove.prevent="progressTouchMove" 
                 @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

const progressBtnWidth = 16

export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    created() {
        this.touch = {}
        this.$nextTick(() => {
            this.barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        })
    },
    watch: {
        percent(newV) {
            if (newV > 0 && !this.touch.initTouch) {
                const offsetWidth = newV * this.barWidth
                this._offset(offsetWidth)
            }
        }
    },
    methods: {
        _offset(offset) {
            this.$refs.progress.style.width = `${offset}px`
            this.$refs.progressBtn.style['transform'] = `translate3d(${offset}px, 0, 0)`
        },
        progressTouchStart(e) {
            this.touch.initTouch = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e) {
            if (!this.touch.initTouch) {
                return
            }
            //focus
            let deltaX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(this.barWidth, Math.max(0, this.touch.left + deltaX))
           
            this._offset(offsetWidth)
        },
        progressTouchEnd() {
            this.touch.initTouch = false
            this._triggerPercent()
        },
        _triggerPercent() {
            //focus
            const percent = this.$refs.progress.clientWidth / this.barWidth
            this.$emit('percentChange', percent)
        },
        progressClick(e) {
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetW = e.pageX - rect.left
            this._offset(offsetW)
            this._triggerPercent()
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>