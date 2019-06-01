import { connect } from "react-redux";

import { increase, decrease } from "actions/counter";
import { AppState } from "store/reducers";

import Counter from "./Counter";

const mapStateToProps = (state: AppState) => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  increase,
  decrease,
};

export type CounterProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Counter);