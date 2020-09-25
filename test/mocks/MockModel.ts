
export class MockModel {
  private props: object;

  constructor(props = {}) {
    this.props = props;
  }
  save() { return this.props; }
}
