import React from 'react';
import { Card, Icon, Statistic } from 'antd';
import './style.scss';

const PanelTopItem = () => {
  return (
    <Card style={{ width: 300 }}>
      <div className="first_row">
        <p>总销售额</p>
        <Icon type="info-circle" />
      </div>
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      <div className="content">
        <p>Content</p>
      </div>
    </Card>
  );
};

export default PanelTopItem;
