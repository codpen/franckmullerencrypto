import { Subscription } from 'rxjs';

const createSubSink = () => {
  let subscriptions: Subscription[] = [];

  return {
    get subscriptions() {
      return subscriptions;
    },
    set sink(subscription: Subscription) {
      subscriptions.push(subscription);
    },
    unsubscribe() {
      subscriptions.forEach(subscription => subscription.unsubscribe());

      subscriptions = [];
    },
  };
};

export default createSubSink;
