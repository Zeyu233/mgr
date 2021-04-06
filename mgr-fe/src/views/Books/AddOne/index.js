import {defineComponent,reactive} from "vue";
import { book } from '@/service';
import {message} from 'ant-design-vue';
import { result,clone} from '@/helpers/utils';
// import { context } from "ant-design-vue/lib/vc-image/src/PreviewGroup";

const defaultFormData = {
    name:'',
    price: 0,
    author:'',
    publishDate:0,
    classify:'',
    count:"",
}
export default defineComponent({
    props:{
        show:Boolean,
    },
    setup(props,context){
        console.log(props,context);
        const addForm = reactive(clone(defaultFormData))

        const submit = async ()=>{
           const form = clone(addForm)
           form.publishDate = addForm.publishDate.valueOf();
           const res = await book.add(form);

           result(res)
            .success((d,{data})=>{
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);
            });
        };

        const close = () => {
            context.emit('update:show',false);
        };


        return {
            submit,
            addForm,
            props,
            close,
        }
    },

})

