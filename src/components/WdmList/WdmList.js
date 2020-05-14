import React, {useState, useEffect, useContext} from 'react';
import {Avatar, Card, ActivityIndicator, DataTable} from 'react-native-paper';
import {AuthContext} from '../../context/AuthCntext';
import {postInternalAPI} from '../../../util/APIMethods';
import {useNavigation} from '@react-navigation/native';

const WdmList = props => {
  const {token} = useContext(AuthContext);
  const navigation = useNavigation();
  const [wdmData, setWdmData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    //console.log('mounted');
    getInitialData(page);
  }, []);

  const getInitialData = async p => {
    let endpoint = `wdmconvert/getwdmtable?page=${p + 1}`;
    let body = JSON.stringify({
      ID: '',
      管理ID: '',
      グループID: '',
      甲乙区分: '全て',
      品目コード: '全て',
      用品名: '全て',
      カテゴリ: '全て',
      品名: '全て',
      型式: '全て',
      ベンダー型式: '全て',
      作業後型式: '',
      製造番号1: '',
      製造番号2: '',
      製造番号3: '',
      作業完了日時: '',
    });
    let data = await postInternalAPI(endpoint, token, body);
    if (data) {
      setWdmData(data);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const wdmClicked = id => {
    //console.log(id);
    navigation.navigate('Details', {id: id});
  };

  return (
    <Card style={{margin: 10}}>
      <Card.Title
        title="WDM Items"
        subtitle="A List of WDM Items"
        left={props => (
          <Avatar.Icon
            {...props}
            icon="transition"
            color="#fff"
            style={{backgroundColor: '#34495E'}}
          />
        )}
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          color="#34495E"
          style={{paddingVertical: 5}}
        />
      ) : (
        <Card.Content style={{flexDirection: 'row'}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                //sortDirection="descending"
                style={{alignItems: 'center', justifyContent: 'center'}}>
                ID
              </DataTable.Title>
              <DataTable.Title
                style={{alignItems: 'center', justifyContent: 'center'}}>
                管理ID
              </DataTable.Title>
              <DataTable.Title
                style={{alignItems: 'center', justifyContent: 'center'}}>
                グループID
              </DataTable.Title>
              <DataTable.Title
                style={{alignItems: 'center', justifyContent: 'center'}}>
                甲乙区分
              </DataTable.Title>
            </DataTable.Header>
            {wdmData.data.map((item, key) => {
              return (
                <DataTable.Row key={key} onPress={() => wdmClicked(item.ID)}>
                  <DataTable.Cell
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    {item.ID}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    {item.管理ID}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    {item.グループID}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    {item.甲乙区分}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Pagination
              page={page}
              numberOfPages={wdmData.total / wdmData.data.length}
              onPageChange={page => {
                setPage(page);
                getInitialData(page);
              }}
              label={`Page ${page + 1} of ${wdmData.total /
                wdmData.data.length}`}
            />
          </DataTable>
        </Card.Content>
      )}
    </Card>
  );
};

export default WdmList;
