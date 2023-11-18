import React from 'react';

import {Col, Row, Steps} from 'antd';

const ProgressSteps: React.FC = () => (
    <>
        <Row>
            <Col span={12} offset={6}>
                <Steps
                    current={0}
                    items={[
                        {
                            title: 'Stage 1',
                            description: 'Create a Campaign',
                        },
                        {
                            title: 'Stage 2',
                            description: 'Add to marketplace',
                        },
                    ]}
                />
            </Col>
        </Row>
    </>
);

export default ProgressSteps;
