import React from 'react';
import firebase, {db} from "./firebase";
// import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    root: {
        padding: theme.spacing.unit * 3,
        width: '90%',
        marginRight: theme.spacing.unit * 5
        // textAlign: 'center',
    }
});

class ShowProducts extends React.Component {
    state = {
        hoodie: [],
        tshirt: [],
        tanktop: [],
        jumper: [],
        windbreaker: []
    };

    getDataFromDb = category => {
        const result = [];
        db.collection(category).get().then(doc => {
            doc.forEach(el => result.push(el.data()));
            this.setState({
                [category]: result
            });
        });
    };

    handleEdit = (event) => {

    };

    render() {
        const {classes} = this.props;

        const hoodie = this.state.hoodie.map(el => (
            <TableRow key={el.SKU}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.category}</TableCell>
                <TableCell>{el.price}</TableCell>
                <TableCell>{el.currency}</TableCell>
                <TableCell>{el.SKU}</TableCell>
                <TableCell>{el.imageUrl}</TableCell>
                <TableCell>{el.description}</TableCell>
                <TableCell>
                    <IconButton onClick={this.handleEdit} variant={'extendedFab'}><i className="material-icons">
                        edit
                    </i></IconButton>
                    <IconButton variant={'extendedFab'}><i className="material-icons">
                        delete
                    </i></IconButton>
                </TableCell>
                {/*<TableCell><IconButton variant={'extendedFab'}><i className="material-icons">*/}
                {/*delete*/}
                {/*</i></IconButton></TableCell>*/}
            </TableRow>
        ));

        // Warunkowo jak bedzie 0 danych w table to wtedy bez jakichkolwiek table elementow dac:
        {/*<CircularProgress/>*/
        }

        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Table>
                        <TableBody>
                            {hoodie}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.getDataFromDb('hoodie');
        this.getDataFromDb('t-shirt');
        this.getDataFromDb('tank-top');
        this.getDataFromDb('jumper');
        this.getDataFromDb('windbreaker');

    }
}

export default withStyles(styles)(ShowProducts);