import React from 'react';
import {Col, Row, Steps} from 'antd';

const ProgressSteps: React.FC = () => (
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
    </>
);

export default ProgressSteps;
