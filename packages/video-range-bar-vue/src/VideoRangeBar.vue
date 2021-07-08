<template>
    <div ref="videoRange"></div>
</template>
<script>
import VideoRangeBar from 'video-range-bar';
export default {
    name:"VideoRangeBar",
    props: {
        config:{
            type: Object,
            default: function () {
                return {  }
            }
        }
    },
    videoRangeBar: null,
    mounted() {
        this.instance();
    },
    methods: {
        instance() {
            this.videoRangeBar = new VideoRangeBar({ ...this.config, el: this.$refs.videoRange });
        }
    },
}
</script>