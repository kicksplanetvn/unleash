import { connect } from 'react-redux';
import StrategiesListComponent from './list-component.jsx';
import { fetchStrategies, removeStrategy } from './../../store/strategy/actions';
import { hasPermission } from '../../permissions';

const mapStateToProps = state => {
    const list = state.strategies.get('list').toArray();

    return {
        strategies: list,
        hasPermission: hasPermission.bind(null, state.user.get('profile')),
    };
};

const mapDispatchToProps = dispatch => ({
    removeStrategy: strategy => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Are you sure you want to remove this strategy?')) {
            removeStrategy(strategy)(dispatch);
        }
    },
    fetchStrategies: () => fetchStrategies()(dispatch),
});

const StrategiesListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StrategiesListComponent);

export default StrategiesListContainer;
