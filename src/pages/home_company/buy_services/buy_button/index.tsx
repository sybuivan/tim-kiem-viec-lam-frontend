import { useEffect } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  FUNDING,
} from '@paypal/react-paypal-js';

// These are the props in the UI
const currency = 'USD';
const style = { layout: 'vertical' };

type ButtonWrapperProps = {
  currency: string;
  amount: string;
  showSpinner: boolean;
  onBuyService: (id_history: string) => void;
};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  currency,
  amount,
  showSpinner,
  onBuyService,
}) => {
  // usePayPalScriptReducer can be used only inside children of PayPalScriptProvider
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  console.log({ amount });

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={(data: any, actions?: any) => {
          return actions?.order?.capture().then(() => {
            const { orderID } = data;
            onBuyService(orderID);
          });
        }}
      />
    </>
  );
};

export default function BuyButton({
  amount,
  onBuyService,
}: {
  amount: string;
  onBuyService: (id_history: string) => void;
}) {
  return (
    <div style={{ maxWidth: '750px', minHeight: '200px' }}>
      <PayPalScriptProvider
        options={{
          'client-id': 'test',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
          amount={amount}
          onBuyService={onBuyService}
        />
      </PayPalScriptProvider>
    </div>
  );
}
