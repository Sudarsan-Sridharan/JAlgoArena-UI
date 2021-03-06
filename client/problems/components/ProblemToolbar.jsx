import React from 'react';

import {ButtonToolbar, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome from '../../common/components/FontAwesome';

const ProblemToolbar = ({children, problem, onRefresh, onShowPointsLegend, activeLanguage}) => (
    <ButtonToolbar>
        <LinkContainer to={"problem/" + problem.id}>
            <Button bsStyle="danger" className="pull-right" onClick={onRefresh}>
                <FontAwesome name="refresh"/> Refresh
            </Button>
        </LinkContainer>
        <Button bsStyle="success"
                className="pull-right"
                onClick={onShowPointsLegend}>
            Max {(10 + ((problem.level - 1) * 20)) * (activeLanguage === 'java' ? 1 : 1.5)} Points
        </Button>
        {children}
    </ButtonToolbar>
);

export default ProblemToolbar;