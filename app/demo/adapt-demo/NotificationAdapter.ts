export type RawNotification = {
  id: string;
  createdTimestamp: number;
  updatedTimestamp: number;
  typeId: number;
  statusId: number;
  message: string;
  rawMetadata: unknown;
}

export class NotificationAdapter {
  private value: RawNotification;

  constructor(obj: RawNotification) {
    this.value = obj;
  }

  get statusText() {
    switch (this.value.statusId) {
      case 1:
        return 'Info';
      case 2:
        return 'Success';
      case 3:
        return 'Warning';
      case 4:
        return 'Info';
      default:
        return 'Default';
    }
  }

  get typeText() {
    switch (this.value.typeId) {
      case 1:
        return 'Email';
      case 2:
        return 'SMS';
      case 3:
        return 'Push';
      default:
        return 'Default';
    }
  }

  get createDateFormatted() {
    return new Date(this.value.createdTimestamp).toLocaleString();
  }

  adapt() {
    return {
      id: this.value.id,
      message: this.value.message,
      statusText: this.statusText,
      typeText: this.typeText,
      createdDate: this.createDateFormatted,
    }
  }
}
