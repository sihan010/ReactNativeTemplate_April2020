import React from 'react';
import {Card, Avatar, DataTable} from 'react-native-paper';

const WdmInfo = props => {
  let wdmData = props.wdmData;

  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="WDM Details"
        subtitle="Full Details of WDM Item"
        left={props => (
          <Avatar.Icon
            {...props}
            icon="transition"
            color="#fff"
            style={{backgroundColor: '#34495E'}}
          />
        )}
      />
      <Card.Content>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>ID</DataTable.Cell>
            <DataTable.Cell>{wdmData.ID}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>管理ID</DataTable.Cell>
            <DataTable.Cell>{wdmData.管理ID}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>ベンダー</DataTable.Cell>
            <DataTable.Cell>{wdmData.ベンダー}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
    </Card>
  );
};

export default WdmInfo;
