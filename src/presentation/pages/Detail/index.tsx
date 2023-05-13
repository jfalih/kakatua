import React, {useMemo, useRef} from 'react';
import Container from '../../components/organisms/Container';
import Carousel from '../../components/molecules/Carousel';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Text from '../../components/atoms/Text';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {usePlace} from '../../../core/apis/Places/usePlaces';
import Icon from '../../components/atoms/Icon';
import Divider from '../../components/atoms/Layout/Divider';
import Image from '../../components/atoms/Image';
import RenderHTML from 'react-native-render-html';
import {Flex} from '../../components/atoms/Layout';
import MapView from 'react-native-maps';
import IframeRenderer, {iframeModel} from '@native-html/iframe-plugin';

const Detail = ({route}) => {
  const {id} = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {pallate} = useTheme();
  const snapPoints = useMemo(() => ['70%', '100%'], []);
  const {data: place} = usePlace(id);
  const {spacing} = useTheme();

  const renderers = {
    iframe: IframeRenderer,
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
  };

  return (
    <Container>
      <Carousel
        name={place?.name}
        prices={place?.price}
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
              {place?.images.map(val => (
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
                  height: 300,
                }}
                initialRegion={{
                  latitude: Number(place?.map[0]),
                  longitude: Number(place?.map[1]),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </Flex>
          </VStack>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};

export default Detail;
