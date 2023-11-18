import React from 'react';
import {Button, Col, Form, InputNumber, message, Row} from 'antd';
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

type FieldType = {
    budget: number;
};

const SubmitCampaign: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = () => {
        messageApi.open({
            type: 'success',
            content: 'Campaign was submitted to marketplace successfully.',
        });
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
            <ProgressSteps step={2}/>
            <Row>
                <Col span={12} offset={6}>
                    <h1>Add to Marketplace</h1>
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
                            label="Project Budget"
                            name="budget"
                            rules={[{required: true, message: 'Input project budget'}]}
                        >
                            <InputNumber prefix="$" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 12, span: 12}}>
                            <Button type="primary" htmlType="submit" style={styles.button}>
                                Submit Campaign
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default SubmitCampaign;
