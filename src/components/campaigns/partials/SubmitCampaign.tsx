import React from 'react';

import {Button, Card, Col, Form, InputNumber, message, Row} from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useNFTMarketplace from 'hooks/useMarketplace';

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
    const [searchParams] = useSearchParams();
    const { listNFT } = useNFTMarketplace();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const id = searchParams.get('id') || 1;
        const contractAddress = searchParams.get('contract') || "";
        try {
            const result = await listNFT(contractAddress, Number(id), 1, values.budget);
            console.log(result);
        messageApi.open({
            type: 'success',
            content: 'Campaign was submitted to marketplace successfully.',
        });
        navigate(`/marketplace`);
    } catch (error) {
        messageApi.open({
            type: 'error',
            content: 'Error occurred, check inputs.',
        });
    };
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
            <Row style={{ marginTop: '30px' }}>
                <Col span={18} offset={3}>
                    <Card title="Add Campaign to Marketplace" bordered={true}>
                        <Form
                            name="basic"
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                label="Project Budget"
                                name="budget"
                                rules={[{required: true, message: 'Input project budget'}]}
                            >
                                <InputNumber prefix="$" style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 10, span: 12 }} style={{ marginTop: '40px' }}>
                                <Button type="primary" htmlType="submit" style={styles.button}>
                                    Submit Campaign
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default SubmitCampaign;
