export default interface IQueueComponent {
  add: (data: any) => true;
  get: () => any;
  remove: (data: any) => true;
}
