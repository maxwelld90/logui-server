import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';

class FlightAddPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            hasFailed: false,
            appInfo: null,
        };
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.appInfo) {
            return [];
        }
        
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications/" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.state.appInfo.id}/`} displayText={`${this.state.appInfo.name}`} />,
            <TrailItem key="4" to={`/applications/${this.state.appInfo.id}/add/`} displayText="Add New Flight" />,
        ];
    }

    async getAppDetails() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/info/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            if (response.status == 200) {
                this.setState({
                    appInfo: data,
                });

                return;
            }

            this.setState({
                hasFailed: true,
            })
        });
    }

    async componentDidMount() {
        await this.getAppDetails();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getAppDetails();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    render() {
        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.appInfo) {
            return(null); // Could add a loading thing here.
        }

        return (
            <main>
                <section>
                    <div className="header-container">
                        <h1>Add New Flight</h1>
                    </div>

                    <p>
                        Add a new flight to an existing application
                    </p>
                </section>
            </main>
        )
    };

}

export default FlightAddPage;