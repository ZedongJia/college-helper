export default {
    namespaced: true,
    state: {
        textInput:
            '建设世界一流大学和一流学科，简称“双一流”建设。2015年11月，国务院印发《统筹推进世界一流大学和一流学科建设总体方案》提出以建设一流学科和一流大学来建成高等教育强国。这是我国高等教育领域继“211工程”“985工程”之后的又一国家战略。2017年9月，教育部公布了首批“双一流”建设高校及建设学科名单，其中一流大学建设高校42所，一流学科建设高校95所。',
        recognizeResult: '',
        segmentationResult: '',
        entity: {}
    },
    mutations: {
        record(state, input) {
            state.textInput = input
        },
        recordResult(state, params) {
            state.recognizeResult = params.recognizeResult
            state.entity = params.entity
            state.segmentationResult = params.segmentationResult
        }
    }
}
