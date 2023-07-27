import React, { useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Breadcrumb,
  Card,
  Modal,
  Form,
  Message,
  Popconfirm,
} from '@arco-design/web-react';
import { useSelector, useDispatch } from 'react-redux';

import {
  TOGGLE_CONFIRM_LOADING,
  TOGGLE_VISIBLE,
  UPDATE_FORM_PARAMS,
  UPDATE_LIST,
  UPDATE_LOADING,
  UPDATE_PAGINATION,
} from './redux/actionTypes';
import useLocale from '../../utils/useLocale';
import { ReducerState } from '../../redux';
import styles from './style/index.module.less';
import { getList, create, update, remove } from '../../api/categories';
import { EditableCell, EditableRow } from './edit';
import dayjs from 'dayjs';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};





/****
 * 3.分类管理
 * onAdd：添加分类的按钮点击时间   这里REDUX做的事情是 控制弹出框的显示与隐藏
 * 创建时间格式化日期(dayjs)：1660292316--> 2022-08-12 16:18:36
 * 组件的使用： 
 * 分类的编辑使用组件：EditableCell、EditableRow
 */
function Categories() {
  const locale = useLocale();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      editable: true, //可编辑属性 焦点聚焦
    },
    {
      title: '文章数量',
      dataIndex: 'articleNum',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_, record) => {
        // console.log(record) /***--- record：createTime: 1660292316 ---**/
        return record.createTime
          ? dayjs(record.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      render: (_, record) => {
        return record.updateTime
          ? dayjs(record.updateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: locale['searchTable.columns.operations'],
      dataIndex: 'operations',
      render: (_, record) => (
        <div className={styles.operations}>
          {/* <Button type="text" size="small">
            {locale['searchTable.columns.operations.update']}
          </Button> */}
          <Popconfirm title="Are you sure you want to delete?" onOk={() => onDelete(record)}>
            <Button type="text" status="danger" size="small">
              {locale['searchTable.columns.operations.delete']}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const categoriesState = useSelector((state: ReducerState) => state.categories);

  const { data, pagination, loading, formParams, visible, confirmLoading } = categoriesState;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(current = 1, pageSize = 20, params = {}) {
    dispatch({ type: UPDATE_LOADING, payload: { loading: true } });
    try {
      const postData = {
        page: current,
        pageSize,
        ...params,
      };
      // console.log(postData);
      const res: any = await getList(postData);
      // console.log(res);
      if (res) {
        dispatch({ type: UPDATE_LIST, payload: { data: res.data.list } });
        dispatch({
          type: UPDATE_PAGINATION,
          payload: { pagination: { ...pagination, current, pageSize, total: res.data.totalCount } },
        });
        dispatch({ type: UPDATE_LOADING, payload: { loading: false } });
        dispatch({ type: UPDATE_FORM_PARAMS, payload: { params } });
      }
    } catch (error) {}
  }
  /***--- 表格的onChange回调函数 ---**/
  function onChangeTable(pagination) {
    const { current, pageSize } = pagination;
    fetchData(current, pageSize, formParams);
  }
  /***--- 搜索分类名称输入框的Search  ---**/
  function onSearch(name) {
    fetchData(1, pagination.pageSize, { name });
  }
  /***--- onAdd：添加分类的按钮点击时间   这里REDUX做的事情是 控制弹出框的显示与隐藏 ---**/
  const onAdd = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: true,
      },
    });
  };
  /*** 添加分类-弹出框的取消按钮 */
  const onCancel = () => {
    dispatch({
      type: TOGGLE_VISIBLE,
      payload: {
        visible: false,
      },
    });
    form.resetFields();
  };
  /***--- 添加分类-弹出框的确定按钮 ---**/
  const onOk = async () => {
    await form.validate();
    const data = form.getFields(); // {name:'123'}
    dispatch({
      type: TOGGLE_CONFIRM_LOADING,
      payload: {
        confirmLoading: true,
      },
    });
    const res: any = await create(data);
    if (res.code === 0) {
      dispatch({
        type: TOGGLE_CONFIRM_LOADING,
        payload: {
          confirmLoading: false,
        },
      });
      onCancel();
      fetchData();
      Message.success(res.msg);
    } else {
      Message.success('添加失败，请重试！');
    }
  };

  /***--- 修改分类名称 双击编辑 ---**/
  const onHandleSave = async (row) => {
    const res: any = await update(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('修改失败，请重试！');
    }
  };
  /***--- 表格中的操作 选择删除按钮 ---**/
  const onDelete = async (row) => {
    const res: any = await remove(row);
    if (res.code === 0) {
      Message.success(res.msg);
      fetchData();
    } else {
      Message.error('删除失败，请重试！');
    }
  };






  return (
    <div className={styles.container}>
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
      </Breadcrumb>
      <Card bordered={false}>
        <div className={styles.toolbar}>   {/* 左右分布：justify-content: space-between;  按钮和输入框两侧分布  */}
          <div> 
            <Button onClick={onAdd} type="primary">
              添加分类
            </Button>
          </div>
          <div>
            {/* <DatePicker.RangePicker style={{ marginRight: 8 }} onChange={onDateChange} /> */}
            <Input.Search
              style={{ width: 300 }}
              searchButton
              placeholder="请输入分类名称"
              onSearch={onSearch}
            />
          </div>
        </div>
        <Table
          rowKey="_id"
          loading={loading} //加载
          onChange={onChangeTable} //变化
          pagination={pagination} //页码
          columns={columns.map((column) => //这里面循环是数据 dataIndex要对应data里面的属性名 如果要渲染多组件 需要使用render()
            column.editable
              ? {
                  ...column,
                  onCell: () => ({
                    onHandleSave,
                  }),
                }
              : column
          )}
          data={data}
          components={{ /***--- 使用组件 EditableRow、EditableCell ---**/
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          className={styles['table-demo-editable-cell']}
        />

        <Modal
          title={<div style={{ textAlign: 'left' }}> 添加分类 </div>}
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={onCancel}
        >
          <Form {...formItemLayout} form={form}>
            <FormItem
              label="分类名称"
              field="name"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input placeholder="请输入分类名称" />
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}

export default Categories;