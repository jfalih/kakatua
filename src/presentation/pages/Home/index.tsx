import React from 'react';
import Container from '../../components/organisms/Container';
import {useAuth} from '../../../services/context/Auth/Auth.context';
import Text from '../../components/atoms/Text';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import SearchBar from '../../components/atoms/SearchBar';
import useCities from '../../../core/apis/Cities/useCities';
import {FlashList} from '@shopify/flash-list';
import Pressable from '../../components/atoms/Pressable';
import Image from '../../components/atoms/Image';
import {VStack, VStackAnimated} from '../../components/atoms/Layout/Stack';
import Divider from '../../components/atoms/Layout/Divider';
import {Flex} from '../../components/atoms/Layout';
import {FadeInDown} from 'react-native-reanimated';
import Section from '../../components/organisms/Section';
const Home = () => {
  const {user} = useAuth();
  const {spacing, pallate} = useTheme();
  const {data: cities} = useCities();
  return (
    <Container
      spacing={spacing.large}
      scrollable
      navbar={{
        type: 'default',
        name: user?.displayName,
      }}>
      <VStack
        spacing={spacing.large}
        padding={{
          paddingHorizontal: spacing.extraLarge,
        }}>
        <Text type="title" weight="01" text={`Kamu mau kemana\nhari ini?`} />
        <SearchBar
          icon={{
            name: 'IconSearch',
            size: 24,
            color: pallate.blackout['04'],
          }}
          placeholder="Cari tujuanmu disini.."
        />
      </VStack>
      <Flex height={80}>
        <FlashList
          horizontal
          contentContainerStyle={{
            paddingHorizontal: spacing.large,
          }}
          ItemSeparatorComponent={() => (
            <Divider horizontal thickness={spacing.extraLarge} />
          )}
          data={cities}
          extraData={cities}
          estimatedItemSize={80}
          renderItem={({item, i}) => (
            <Pressable>
              <VStackAnimated
                spacing={spacing.small}
                items="center"
                entering={FadeInDown.duration(1000).delay(200 * i)}>
                <Image
                  borderRadius={25}
                  width={50}
                  height={50}
                  source={{
                    uri: item.image,
                  }}
                />
                <Text>{item.name}</Text>
              </VStackAnimated>
            </Pressable>
          )}
        />
      </Flex>
      <Section
        title="Lokasi Populer"
        description="Ayo liburan ke lokasi menarik, ada berbagai macam lokasi populer yang kami rekomendasikan.">
          
        </Section>
      <Section
        title="Lokasi Terdekat"
        description="Rekomendasi berdasarkan lokasimu"
      />
    </Container>
  );
};

export default Home;
