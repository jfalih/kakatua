import React, {useMemo, useRef, useState} from 'react';
import Container from '../../components/organisms/Container';
import Carousel from '../../components/molecules/Carousel';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from '../../components/atoms/Text';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {useFoods, usePlace, useShop} from '../../../core/apis/Places/usePlaces';
import Icon from '../../components/atoms/Icon';
import Divider from '../../components/atoms/Layout/Divider';
import Image from '../../components/atoms/Image';
import {Box, Flex} from '../../components/atoms/Layout';
import MapView from 'react-native-maps';
import {useWindowDimensions} from 'react-native';
import {LogoMapPin} from '../../../assets';
import Pressable from '../../components/atoms/Pressable';
import {FlatList} from 'react-native-gesture-handler';
import currency from '../../../core/utils/currency';

const Detail = ({route}) => {
  const {id} = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [quantity, setQuantity] = useState(1);
  const [tour, setTour] = useState(false);
  const {pallate} = useTheme();
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const {data: place} = usePlace(id);
  const {spacing} = useTheme();
  const {width} = useWindowDimensions();
  const {data: shops} = useShop();
  const {data: foods} = useFoods();

  const total = useMemo(() => {
    if (tour) {
      return place?.price * quantity + 300000;
    }
    return place?.price * quantity;
  }, [place?.price, tour, quantity]);

  return (
    <Container>
      <Carousel
        name={place?.name}
        prices={currency(place?.price)}
        city={place?.city}
        data={place?.images || []}
      />
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetScrollView>
          <VStack
            spacing={spacing.standard}
            padding={{paddingHorizontal: spacing.extraLarge}}>
            <Text type="title" weight="01">
              About
            </Text>
            <Text>{place?.desc || 'Loading..'}</Text>
            <Divider color={pallate.whiteout['03']} thickness={1} />
          </VStack>
          <HStack height={80} items="center">
            <VStack spacing={spacing.tiny} fill items="center">
              <Icon name="IconPlane" size={32} color={pallate.blackout['04']} />
              <Text>{place?.flight} Jam</Text>
            </VStack>
            <Divider
              horizontal
              height={50}
              color={pallate.whiteout['03']}
              thickness={1}
            />
            <VStack spacing={spacing.tiny} fill items="center">
              <Icon name="IconClock" size={32} color={pallate.blackout['04']} />
              <Text>{place?.duration} Menit</Text>
            </VStack>
          </HStack>
          <VStack
            spacing={spacing.standard}
            padding={{paddingHorizontal: spacing.extraLarge}}>
            <Divider color={pallate.whiteout['03']} thickness={1} />
            <HStack justify="space-between" fill>
              {place?.images?.map(val => (
                <Image
                  width={72}
                  height={72}
                  borderRadius={16}
                  source={{
                    uri: val,
                  }}
                />
              ))}
            </HStack>
          </VStack>
          <VStack
            margin={{
              marginTop: spacing.large,
            }}
            spacing={spacing.large}
            padding={{
              paddingHorizontal: spacing.extraLarge,
            }}>
            <Text type="title" weight="01">
              Shop
            </Text>
            <Flex height={300}>
              <FlatList
                data={shops}
                horizontal
                ItemSeparatorComponent={() => (
                  <Divider horizontal thickness={spacing.large} />
                )}
                renderItem={({item}) => (
                  <Pressable width={137}>
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
              />
            </Flex>
          </VStack>

          <VStack
            margin={{
              marginTop: spacing.large,
            }}
            spacing={spacing.large}
            padding={{
              paddingHorizontal: spacing.extraLarge,
            }}>
            <Text type="title" weight="01">
              Food
            </Text>
            <Flex height={300}>
              <FlatList
                data={foods}
                horizontal
                ItemSeparatorComponent={() => (
                  <Divider horizontal thickness={spacing.large} />
                )}
                renderItem={({item}) => (
                  <Pressable width={137}>
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
              />
            </Flex>
          </VStack>
          {place && (
            <VStack
              spacing={spacing.standard}
              padding={{paddingHorizontal: spacing.extraLarge}}>
              <Text type="title" weight="01">
                Location
              </Text>
              <Flex
                borderRadius={20}
                style={{
                  overflow: 'hidden',
                }}>
                <MapView
                  style={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}
                  pitchEnabled={false}
                  initialRegion={{
                    latitude: Number(place?.map?.[0]),
                    longitude: Number(place?.map?.[1]),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
                <Box
                  width={42}
                  position={{
                    top: width / 2 - 42,
                    left: (width - spacing.extraLarge * 2) / 2 - 42 / 2,
                  }}
                  height={42}>
                  <LogoMapPin
                    width={42}
                    height={42}
                    color={pallate.red['04']}
                  />
                </Box>
              </Flex>
            </VStack>
          )}
          <Divider thickness={spacing.extraLarge * 8} />
        </BottomSheetScrollView>
      </BottomSheet>
      <VStack
        backgroundColor={pallate.whiteout['03']}
        borderRadius={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        width={width - spacing.large * 2}
        position={{
          bottom: 20,
        }}
        self="center">
        <VStack
          spacing={spacing.medium}
          padding={{
            paddingVertical: spacing.standard,
            paddingHorizontal: spacing.large,
          }}>
          <HStack items="center">
            <VStack fill>
              <Text type="title" weight="05">
                Tour Guide
              </Text>
              <Text
                type="subtitles"
                weight="03">{`Tour ${place?.name}, kerajinan, dan makanan.`}</Text>
            </VStack>
            <HStack items="center" spacing={spacing.standard}>
              <Pressable onPress={() => setTour(!tour)}>
                <Icon
                  name={tour ? 'IconSquareCheck' : 'IconSquare'}
                  color={pallate.blackout['05']}
                  size={24}
                />
              </Pressable>
            </HStack>
          </HStack>
          <HStack items="center">
            <Text fill type="title" weight="05">
              Quantity
            </Text>
            <HStack items="center" spacing={spacing.standard}>
              <Pressable
                onPress={() =>
                  setQuantity(prev => {
                    if (prev > 1) {
                      return prev - 1;
                    }
                    return prev;
                  })
                }>
                <Icon
                  name="IconSquareRoundedMinus"
                  color={pallate.blackout['05']}
                  size={24}
                />
              </Pressable>
              <Text type="title" weight="05">
                {quantity || 0}
              </Text>
              <Pressable onPress={() => setQuantity(prev => prev + 1)}>
                <Icon
                  name="IconSquareRoundedPlus"
                  color={pallate.blackout['05']}
                  size={24}
                />
              </Pressable>
            </HStack>
          </HStack>
        </VStack>
        <HStack
          justify="space-between"
          borderRadius={50}
          padding={{
            paddingVertical: spacing.standard,
            paddingHorizontal: spacing.large,
          }}
          backgroundColor={pallate.blackout['05']}>
          <VStack>
            <Text color={pallate.whiteout['01']}>Total</Text>
            <Text color={pallate.whiteout['01']} type="title" weight="04">
              {currency(total)}
            </Text>
          </VStack>
          <Pressable
            borderRadius={50}
            padding={{
              paddingVertical: spacing.standard,
              paddingHorizontal: spacing.large,
            }}
            backgroundColor={pallate.yellow['03']}>
            <Text type="title" weight="06">
              Book Now
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Detail;
