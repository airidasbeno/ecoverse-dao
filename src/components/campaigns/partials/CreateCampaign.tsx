import React from 'react';

import {Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row} from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
import TextArea from "antd/es/input/TextArea";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import mintUniqueToken from 'hooks/useMint';

import ProgressSteps from "./ProgressSteps";

const styles = {
    button: {
        height: "40px",
        padding: "0 20px",
        textAlign: "center",
        fontWeight: "600",
        letterSpacing: "0.2px",
        fontSize: "15px",
        border: "none",
        borderRadius: '32px',
    },
} as const;

dayjs.extend(customParseFormat);

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
    name: string;
    description: string;
    ipfs_metadata: string;
    nft_count: number;
    end_date?: string;
};

const CreateCampaign: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();


    const onFinish = async (values: FieldType) => {
        try {

            const result = await mintUniqueToken(values.nft_count, values.ipfs_metadata, values.description);
    
            if(!result) {
                messageApi.open({
                    type: 'error',
                    content: 'Error occurred during minting.',
                });
                return;
            } else {
            messageApi.open({
                type: 'success',
                content: 'Campaign was created successfully.',
            });
        }
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: `Error occurred during minting: ${error.message}`,
            });
        }
    };
    

    const onFinishFailed = () => {
        messageApi.open({
            type: 'error',
            content: 'Error occurred, check inputs.',
        });
    };

    return (
        <>
            {contextHolder}
            <ProgressSteps step={1} />
            <Row style={{ marginTop: '30px' }}>
                <Col span={18} offset={3}>
                    <Card title="Create a Campaign" bordered={true}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Input campaign name' }]}
                            >
                                <Input placeholder="Enter campaign name" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Input campaign description' }]}
                            >
                                <TextArea rows={6} placeholder="Enter campaign description" maxLength={300} />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="NFT Count"
                                rules={[{ required: true, message: 'Select campaign NFT count' }]}
                                name="nft_count"
                            >
                                <InputNumber min={1} max={10000} placeholder={'Enter NFT count'} />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="IPFS metadata"
                                name="ipfs_metadata"
                                rules={[{ required: true, message: 'Input campaign IPFS metadata' }]}
                            >
                                <Input placeholder="Enter campaign IPFS metadata" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="End Date"
                                rules={[{ required: true, message: 'Select campaign end date' }]}
                                name="end_date"
                            >
                                <DatePicker
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 10, span: 12 }} style={{ marginTop: '40px' }}>
                                <Button type="primary" htmlType="submit" style={styles.button}>
                                    Create Campaign
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateCampaign;
