import React, { useState } from 'react';
import { IconButton, Text, TextInput, ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { useNoxSetting } from '../../hooks/useSetting';

export default ({ onSearched = (vals: any) => console.log(vals) }) => {
  const [searchVal, setSearchVal] = useState('https://noxplay.us.to');
  const [searchProgress, progressEmitter] = useState(0);
  const playerSetting = useNoxSetting(state => state.playerSetting);

  const handleSearch = async (val = searchVal) => {
    progressEmitter(100);
    try {
      const searchedResult = await (await fetch(val)).json();
      onSearched(searchedResult);
    } catch {
      Snackbar.show({ text: '读入自定义皮肤JSON出错' });
    } finally {
      progressEmitter(0);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TextInput
          style={{ flex: 5 }}
          label="自定义皮肤JSON网址"
          value={searchVal}
          onChangeText={val => setSearchVal(val)}
          onSubmitEditing={() => handleSearch(searchVal)}
          selectTextOnFocus
        />
        <IconButton
          icon="search-web"
          onPress={() => handleSearch(searchVal)}
          size={30}
        />
      </View>
      <ProgressBar
        progress={Math.max(searchProgress, 0)}
        indeterminate={searchProgress === 1}
      />
    </View>
  );
};
