import React, {useCallback} from 'react';
import Container from '../../components/organisms/Container';
import {FlashList} from '@shopify/flash-list';
import useTickets from '../../../core/apis/Places/useTickets';
import usePlaces from '../../../core/apis/Places/usePlaces';
import Pressable from '../../components/atoms/Pressable';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Image from '../../components/atoms/Image';
import {Flex} from '../../components/atoms/Layout';
import currency from '../../../core/utils/currency';
import Text from '../../components/atoms/Text';
import Divider from '../../components/atoms/Layout/Divider';
import {FlatList, useWindowDimensions} from 'react-native';
import Icon from '../../components/atoms/Icon';

const Ticket = ({navigation}) => {
  const {spacing, pallate} = useTheme();
  const {width} = useWindowDimensions();
  const {data: tickets} = useTickets();
  const {data: places} = usePlaces();

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
        <Text align="center" type="title" weight="02">
          Ticket kamu masih kosong, yuk beli sekarang..
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
    <Container scrollable>
      <VStack
        padding={{
          paddingVertical: spacing.large,
          paddingHorizontal: spacing.extraLarge,
        }}>
        <VStack
          margin={{
            marginBottom: spacing.large,
          }}>
          <Text type="title" weight="01">
            Ticket
          </Text>
        </VStack>
        <FlatList
          scrollEnabled={false}
          data={tickets}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={() => <Divider thickness={spacing.large} />}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('Invoice', {
                    id: item.key,
                  })
                }>
                <VStack
                  borderWidth={1}
                  padding={spacing.large}
                  borderColor={pallate.whiteout['03']}
                  spacing={spacing.standard}
                  width={width - spacing.extraLarge * 2}>
                  <HStack fill>
                    <VStack fill>
                      <Text type="title" weight="03">
                        {item?.name}
                      </Text>
                      <Text>{item?.city}</Text>
                    </VStack>
                    <Text type="title" weight="06">
                      {item?.status}
                    </Text>
                  </HStack>
                  <Divider thickness={1} color={pallate.whiteout['03']} />
                  <HStack>
                    <HStack items="center" spacing={spacing.small} fill>
                      <Icon
                        name="IconTag"
                        size={20}
                        color={pallate.blackout['05']}
                      />
                      <Text type="title" weight="05">
                        Harga
                      </Text>
                    </HStack>
                    <Text type="title" weight="05">
                      Rp{item?.total}
                    </Text>
                  </HStack>
                  <HStack>
                    <HStack items="center" spacing={spacing.small} fill>
                      <Icon
                        name="IconCalendarTime"
                        size={20}
                        color={pallate.blackout['05']}
                      />
                      <Text type="title" weight="05">
                        Tanggal
                      </Text>
                    </HStack>
                    <Text type="title" weight="05">
                      {item?.date.toString()}
                    </Text>
                  </HStack>
                  <HStack>
                    <HStack items="center" spacing={spacing.small} fill>
                      <Icon
                        name="IconTag"
                        size={20}
                        color={pallate.blackout['05']}
                      />
                      <Text type="title" weight="05">
                        Durasi
                      </Text>
                    </HStack>
                    <Text type="title" weight="05">
                      3 Menit
                    </Text>
                  </HStack>
                </VStack>
              </Pressable>
            );
          }}
        />
      </VStack>
      <VStack
        padding={{
          paddingHorizontal: spacing.extraLarge,
        }}>
        <Text type="title" weight="03">
          Lihat Tempat Lainnya
        </Text>
      </VStack>
      <Divider thickness={spacing.large} />
      <Flex height={280}>
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: spacing.extraLarge,
          }}
          ItemSeparatorComponent={() => (
            <Divider horizontal thickness={spacing.large} />
          )}
          renderItem={({item}) => (
            <Pressable
              key={item.key}
              onPress={() =>
                navigation.navigate('Detail', {
                  id: item.key,
                })
              }
              width={137}>
              <VStack spacing={spacing.small}>
                <Image
                  width={137}
                  borderRadius={16}
                  height={180}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text type="title" weight="04">
                  {item.name}
                </Text>
                <Text>{currency(item.price)}</Text>
              </VStack>
            </Pressable>
          )}
          horizontal
          data={places}
        />
      </Flex>
    </Container>
  );
};

export default Ticket;
