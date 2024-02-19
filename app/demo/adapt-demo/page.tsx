import { Adapter } from "./Adapter";
import { type RawNotification, NotificationAdapter } from "./NotificationAdapter";

const AdaptDemo = () => {
  const data: RawNotification = {
    id: '123',
    typeId: 1,
    statusId: 2,
    createdTimestamp: 1708313229041,
    updatedTimestamp: 1708313229041,
    message: 'this is a test',
    rawMetadata: 123,
  }
  const adaptData = Adapter.from(data).to((item: RawNotification) => new NotificationAdapter(item).adapt())

  console.log({ adaptData });
  

  return (
    <div>
      Test Adapter
    </div>
  )
}

export default AdaptDemo;
