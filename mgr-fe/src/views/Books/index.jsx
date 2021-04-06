import { defineComponent, ref, onMounted } from "vue";
import { book } from '@/service';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from "./AddOne/index.vue";
import Update from "./Update/index.vue";

export default defineComponent({
    components: {
        AddOne,
        Update,
    },
    setup() {
        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '库存',
                dataIndex: 'count',
                slots: {
                    customRender: 'count',
                },
            },
            {
                title: '作出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                },
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                }
            },

        ];

        const show = ref(false);
        const isSearch = ref(false);
        const showUpdateModel = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const curEditBook = ref({});
        // 获取列表
        const getList = async () => {
            const res = await book.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });

            result(res).success(({ data }) => {
                const { list: l, total: t } = data;
                list.value = l;
                total.value = t;
            });
        }
        // 切页
        const setPage = (page) => {
            curPage.value = page;

            getList();
        }
        // 搜索
        const onSearch = () => {
            isSearch.value = !!keyword.value;
            getList();
        };
        // 回到全部列表
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;
            getList();
        }

        onMounted(async () => {
            getList();
        })
        // 删除
        const remove = async ({ text: record }) => {
            const { _id } = record;

            const res = await book.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);

                    getList();
                });
        }
        //更新出入库
        const updateCount = (type, record) => {
            let word = '增加';

            if (type === 'OUT_COUNT') {
                word = '减少';
            }

            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count" />
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');
                    let num = el.value;

                    const res = await book.updateCount({
                        id: record._id,
                        num,
                        type,
                    });

                    result(res)
                        .success((data) => {
                            if (type === 'IN_COUNT') {
                                // 入库操作
                                num = Math.abs(num);
                            } else {
                                // 出库操作
                                num = -Math.abs(num);
                            }

                            const one = list.value.find((item) => {
                                return item._id === record._id;
                            });

                            if (one) {
                                console.log(num);
                                one.count = one.count + num;

                                message.success(`成功${word} ${Math.abs(num)} 本书`);
                            }
                        });
                },
            });
        };
        // 显示更新弹框
        const update = ({ record }) => {
            showUpdateModel.value = true;
            curEditBook.value = record;
        };

        // 更新列表的某一行数据
        const updateCurBook = (newData) => {
            Object.assign(curEditBook.value, newData);
        };

        // // 进入商品详情页
        // const toDetail = ({ record }) => {
        //     router.push(`/goods/${record._id}`);
        // };

        // const onUploadChange = ({ file }) => {
        //     if (file.response) {
        //         result(file.response)
        //             .success(async (key) => {
        //                 const res = await good.addMany(key);

        //                 result(res)
        //                     .success(({ data: { addCount } }) => {
        //                         message.success(`成功添加 ${addCount} 本书`);

        //                         getList();
        //                     });
        //             });
        //     }
        // };

        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModel,
            update,
            curEditBook,
            updateCurBook,
        }
    }
})