import React, {useCallback, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import Text from '../../components/atoms/Text';
import Container from '../../components/organisms/Container';
import usePlaces from '../../../core/apis/Places/usePlaces';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Image from '../../components/atoms/Image';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Pressable from '../../components/atoms/Pressable';
import {useWindowDimensions} from 'react-native';
import Divider from '../../components/atoms/Layout/Divider';
import SearchBar from '../../components/atoms/SearchBar';
import {Flex} from '../../components/atoms/Layout';
import Icon from '../../components/atoms/Icon';
import useCities from '../../../core/apis/Cities/useCities';

const City = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {id} = route?.params;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(id);
  const {data: places} = usePlaces(search, category);
  const {width} = useWindowDimensions();
  const {data: cities} = useCities();

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
          Place Not Found
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
      navbar={{
        type: 'back',
      }}
      spacing={spacing.large}
      padding={{
        paddingHorizontal: spacing.extraLarge,
        paddingBottom: spacing.large,
      }}>
      <Text type="title" weight="01">
        Cari
      </Text>
      <SearchBar
        onChangeText={val => setSearch(val)}
        backgroundColor={pallate.whiteout['02']}
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.blackout['04'],
        }}
        placeholder="Cari tujuanmu disini.."
      />
      <Flex height={50}>
        <FlashList
          data={cities}
          extraData={[category, cities]}
          horizontal
          ItemSeparatorComponent={() => (
            <Divider horizontal thickness={spacing.standard} />
          )}
          renderItem={({item}) => (
            <Pressable
              onPress={() => setCategory(item.key)}
              height={40}
              padding={{
                paddingHorizontal: spacing.large,
              }}
              borderRadius={8}
              borderWidth={1}
              backgroundColor={
                item.key === category ? pallate.blackout['05'] : undefined
              }
              borderColor={pallate.blackout['05']}
              items="center"
              justify="center">
              <Text
                color={
                  item.key === category ? pallate.whiteout['01'] : undefined
                }
                type="title"
                weight="06">
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </Flex>
      <Flex height={600}>
        <FlashList
          data={places}
          ListEmptyComponent={ListEmptyComponent}
          estimatedItemSize={200}
          extraData={{places, category}}
          ItemSeparatorComponent={() => <Divider thickness={spacing.large} />}
          renderItem={({item}) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Detail', {
                  id: item.key,
                })
              }
              width={width - spacing.extraLarge * 2}>
              <HStack fill spacing={spacing.standard} items="center">
                <Image
                  borderRadius={16}
                  width={110}
                  height={150}
                  source={{
                    uri: item.image,
                  }}
                />
                <VStack spacing={spacing.large} fill>
                  <VStack>
                    <Text type="title" weight="02">
                      {item.name}
                    </Text>
                    <Text type="subtitles" weight="01">
                      {item.city}
                    </Text>
                  </VStack>
                  <Text fill numberOfLines={4}>
                    {item.desc}
                  </Text>
                </VStack>
                <Flex
                  width={40}
                  height={40}
                  items="center"
                  justify="center"
                  borderRadius={25}
                  backgroundColor={pallate.whiteout['03']}>
                  <Icon
                    name="IconArrowUpRight"
                    size={24}
                    color={pallate.blackout['05']}
                  />
                </Flex>
              </HStack>
            </Pressable>
          )}
        />
      </Flex>
    </Container>
  );
};

export default City;
