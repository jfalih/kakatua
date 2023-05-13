import React, {useCallback, useState} from 'react';
import Container from '../../components/organisms/Container';
import Text from '../../components/atoms/Text';
import SearchBar from '../../components/atoms/SearchBar';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {MasonryFlashList} from '@shopify/flash-list';
import usePlaces from '../../../core/apis/Places/usePlaces';
import {VStack} from '../../components/atoms/Layout/Stack';
import {ImageBackground, useWindowDimensions} from 'react-native';
import Pressable from '../../components/atoms/Pressable';
import Divider from '../../components/atoms/Layout/Divider';
import Icon from '../../components/atoms/Icon';

const Search = ({navigation}) => {
  const {pallate, spacing} = useTheme();
  const [search, setSearch] = useState('');
  const {data: places} = usePlaces(search);
  const {width} = useWindowDimensions();
  const ListEmptyComponent = useCallback(
    () => (
      <VStack
        spacing={spacing.standard}
        width={width - spacing.extraLarge * 2}
        items="center"
        justify="center"
        height={400}
        padding={spacing.large}>
        <Icon name="IconError404Off" size={84} color={pallate.blackout['05']} />
        <Text type="title" weight="02">
          Keyword Not Found
        </Text>
      </VStack>
    ),
    [
      pallate.blackout,
      spacing.extraLarge,
      spacing.large,
      spacing.standard,
      width,
    ],
  );
  return (
    <Container
      scrollable
      backgroundColor={pallate.whiteout['02']}
      spacing={spacing.standard}
      padding={{
        paddingVertical: spacing.large,
        paddingHorizontal: spacing.extraLarge,
      }}>
      <Text type="title" weight="01">
        Cari
      </Text>
      <SearchBar
        onChangeText={val => setSearch(val)}
        backgroundColor={pallate.whiteout['01']}
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.blackout['04'],
        }}
        placeholder="Cari tujuanmu disini.."
      />
      <MasonryFlashList
        data={places}
        extraData={places}
        numColumns={2}
        estimatedItemSize={300}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <Divider thickness={spacing.standard} />}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Detail', {
                id: item.key,
              })
            }>
            <VStack
              padding={{
                paddingLeft: index === 1 ? spacing.small : 0,
                paddingRight: index === 1 ? 0 : spacing.small,
              }}
              border={{
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
              }}
              width="100%">
              <ImageBackground
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
                style={{
                  height: 200,
                }}
                source={{
                  uri: item.image,
                }}
              />
              <VStack
                spacing={spacing.standard}
                border={{
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
                backgroundColor={pallate.whiteout['01']}
                padding={spacing.standard}>
                <VStack spacing={spacing.tiny}>
                  <Text type="title" weight="03">
                    {item.name}
                  </Text>
                  <Text>{item.city}</Text>
                </VStack>
                <Text numberOfLines={3}>{item.desc}</Text>
              </VStack>
            </VStack>
          </Pressable>
        )}
      />
    </Container>
  );
};

export default Search;
