<template>
	<view>
	<!-- 	<exam-widght 
		        :dataList='QuestionList' 
		        :index="index" 
		        @select='selectItem' 
		        @selectFinish='selectFinish' 
		        @finish='finish'
		        :numBoxType='0'
		        :showIndexText='showIndexText'
		        :numBoxShow='numBoxShow'
		        >
		        </exam-widght> -->
	</view>
</template>

<script>
	import ExamWidght from "@/components/ExamWidght.vue"
	export default {
		components:{
			ExamWidght
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
