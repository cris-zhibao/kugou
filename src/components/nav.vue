<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item 
                :id="item.name" 
                v-for="item in navData" 
                :key="item.name"
                @click.native="gotoLink(item.name)"
            >{{item.title}}</mt-tab-item>
        </mt-navbar>
    </div>
</template>
<script>
import {navData} from '@/router'
export default {
    data(){
        return {
            selected:'newSong',
            navData
        }
    },
    watch:{
        $route:{
            handler(){
                this.selected=this.$route.name;
            },
            immediate:true
        }
    },
    methods:{
        gotoLink(name){
            this.$router.push({
                name:name
            });
        }
    }
}
</script>

