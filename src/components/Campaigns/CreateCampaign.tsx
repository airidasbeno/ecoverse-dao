import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {Button, Col, DatePicker, Form, Input, Row, Steps} from 'antd';
import TextArea from "antd/es/input/TextArea";
import {RangePickerProps} from "antd/es/date-picker";

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

dayjs.extend(customParseFormat);

// const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
};

const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
});

type FieldType = {
    name?: string;
    description?: string;
    end_date?: string;
};

const CreateCampaign: React.FC = () => (
    <>
        <Row>
            <Col span={16} offset={4}>
                <Steps
                    current={1}
                    items={[
                        {
                            title: 'Stage 1',
                            description: 'Enter basic details.',
                        },
                        {
                            title: 'Stage 2',
                            description: 'Add contract.',
                        },
                        {
                            title: 'Stage 3',
                            description: 'Finish it up.',
                        },
                    ]}
                />
            </Col>
        </Row>
        <Row>
            <Col span={12} offset={6}>
                <h1>Create a Campaign</h1>
                <p>Welcome to our unique shopping platform. Experience a whole new world of online shopping where
                    quality meets convenience. Explore our vast range of products
                </p>
                <Form
                    name="basic"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 20}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Campaign Name"
                        name="name"
                        rules={[{required: true, message: 'Input campaign name'}]}
                    >
                        <Input placeholder="Enter campaign name" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Campaign Description"
                        name="description"
                        rules={[{required: true, message: 'Input campaign description'}]}
                    >
                        <TextArea rows={6} placeholder="Enter campaign description" maxLength={300} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Campaign End Date"
                        rules={[{required: true, message: 'Select campaign end date'}]}
                        name="end_date"
                    >
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 12, span: 12}}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </>
);

export default CreateCampaign;
