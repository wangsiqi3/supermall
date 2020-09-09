import { debounce } from "./utils"

export const itemLisenerMinxin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            //console.log(1);
            newRefresh();
        }
        this.$bus.$on('imageLoad', this.itemImgListener)
    }
}

import BackTop from "components/content/backTop/BackTop"
export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        listenIsShowBackTop(position, showPosition) {
            this.isShowBackTop = -position.y > showPosition;
        },
    }
}