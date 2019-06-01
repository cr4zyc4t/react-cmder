import { connect } from "react-redux";
import { increase, decrease } from "actions/counter";
import Counter from "./Counter";

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  increase,
  decrease,
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);