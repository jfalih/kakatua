import React, {useMemo} from 'react';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Icon from '../../components/atoms/Icon';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Text from '../../components/atoms/Text';
import Container from '../../components/organisms/Container';
import useInvoice from '../../../core/apis/Invoice/useInvoice';
import Divider from '../../components/atoms/Layout/Divider';
import currency from '../../../core/utils/currency';

const Invoice = ({route, navigation}) => {
  const {pallate, spacing} = useTheme();
  const {id} = route?.params;
  const {data: invoice} = useInvoice(id);

  const total = useMemo(() => {
    if (invoice?.tour) {
      return invoice?.price * invoice?.quantity + 300000;
    }
    return invoice?.price * invoice?.quantity;
  }, [invoice]);

  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Invoice',
      }}
      padding={spacing.large}>
      <VStack spacing={spacing.large}>
        <VStack
          padding={spacing.large}
          backgroundColor={
            invoice?.status === 'unpaid' ? pallate.blackout['05'] : '#15B489'
          }
          items="center"
          borderRadius={12}
          spacing={spacing.large}
          justify="center">
          <Icon
            name={
              invoice?.status === 'unpaid'
                ? 'IconHourglassHigh'
                : 'IconSquareRoundedCheck'
            }
            size={42}
            color={pallate.whiteout['01']}
          />
          <Text color={pallate.whiteout['01']} type="title" weight="05">
            Menunggu Pembayaran
          </Text>
        </VStack>
        <VStack
          backgroundColor={pallate.whiteout['03']}
          borderRadius={12}
          spacing={spacing.standard}
          padding={spacing.large}>
          <Text type="title" weight="05">
            Detail Pembayaran
          </Text>
          <HStack justify="space-between">
            <Text type="subtitles" weight="01">
              Id Pembayaran
            </Text>
            <Text>{invoice?.key}</Text>
          </HStack>
          <Divider thickness={1} color={pallate.whiteout['04']} />
          <Text type="title" weight="05">
            Items
          </Text>
          <HStack justify="space-between">
            <Text type="subtitles" weight="01">
              Tiket {invoice?.name} x {invoice?.quantity}
            </Text>
            <Text>{currency(invoice?.price)}</Text>
          </HStack>
          {invoice?.tour && (
            <HStack justify="space-between">
              <Text type="subtitles" weight="01">
                Tour Guide,
              </Text>
              <Text>{currency(300000)}</Text>
            </HStack>
          )}
          <Divider thickness={1} color={pallate.whiteout['04']} />
          <HStack justify="space-between">
            <Text type="subtitles" weight="01">
              Subtotal
            </Text>
            <Text>{currency(invoice?.price * invoice?.quantity)}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text type="subtitles" weight="01">
              Total
            </Text>
            <Text>{currency(total)}</Text>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Invoice;
