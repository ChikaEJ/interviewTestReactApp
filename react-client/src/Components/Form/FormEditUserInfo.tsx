import React from 'react';
import {Form, Button, Input, Space} from "antd";
import {IFormProps} from "../../Interfaces/IFormProps";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const FormEditUserInfo: React.FC<IFormProps> = ({onFinish, data, setData}) => {
    const [form] = Form.useForm();
    const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setData({...data, [name]: value});
    }
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{maxWidth: 600}}
        >
            <Form.Item name="name" label="Name" initialValue={data?.name} rules={[{required: true}]}>
                <Input name="name" onChange={(e) => inputHandle(e)}/>
            </Form.Item>
            <Form.Item name="company" label="Company" initialValue={data?.company} rules={[{required: true}]}>
                <Input name="company" onChange={(e) => inputHandle(e)}/>
            </Form.Item>
            <Form.Item name="location" label="Location" initialValue={data?.location} rules={[{required: true}]}>
                <Input name="location" onChange={(e) => inputHandle(e)}/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default FormEditUserInfo;