<template>
  <div v-if="infoParams.sizes" class="infoParams">
    <table class="sizes">
        <tr v-for="(tr,index) in infoParams.sizes[0]" :key="index">
            <td v-for="(td,indey) in tr" :key="indey">{{td}}</td>
        </tr>
    </table>
    <table class="infoSet">
        <tr v-for="(tr,index) in infoParams.infoSet" :key="index">
            <td v-for="(td,indey) in tr" :key="indey">{{td}}</td>
        </tr>
    </table>
    <div v-if="infoParams.image">
        <img :src="infoParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
 name:"DetailInfoParams",
 props:{
     infoParams:{
         type:Object,
         default() {
             return {}
         }
     }
 }
}
</script>

<style scoped>
 .infoParams{
     padding: 30px 8px 0px;
     border-top: 4px solid #eee;
     margin-top: 20px;

 }
 table {
      width:100%;
 }
 
 .infoParams .sizes{
     border-collapse: collapse;
     border-bottom: 4px solid #eee;
 }
 
 .infoParams .sizes tr td{
     padding:10px 0px;
     border-bottom:1px solid #eee;
 }
 .infoSet tr td:first-child{
    width: 120px;
 }
 .infoSet tr td:last-child{
     color:var(--color-high-text)
 }
 .infoSet tr td {
     height: 40px;
 }
 img {
     width: 100%;
 }
</style>