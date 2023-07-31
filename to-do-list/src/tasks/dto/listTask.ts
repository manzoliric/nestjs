export class ListTaskDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly completed: boolean,
  ) {}
}
