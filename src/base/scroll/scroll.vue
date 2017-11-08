<template>
    <div ref="wrapper">
        
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props: {
        data: {
            type: Array,
            default: null
        },
        click: {
            type: Boolean,
            default: true
        },
        probeType: {
            type: Number,
            default: 1
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        }      
    },
    watch: {
        data() {
            setTimeout(()=>{
                this.refresh()
            },20);
        }
    }
}
</script>
