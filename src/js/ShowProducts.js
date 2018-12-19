import React from 'react';
import firebase, {db} from './firebase';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    root: {
        padding: theme.spacing.unit * 3,
        minWidth: 1550,
        width: '90%',
        margin: '0 auto'
        // textAlign: 'center',
    }
});

// this is working, below trying to make 'delete' work by passing SKU as props
// const CategoryConcat = (category, handleEdit, handleDelete) => (
//     category.map(el => (
//         <TableRow key={el.SKU}>
//             <TableCell>{el.name}</TableCell>
//             <TableCell>{el.category}</TableCell>
//             <TableCell>{el.price}</TableCell>
//             <TableCell>{el.currency}</TableCell>
//             <TableCell>{el.SKU}</TableCell>
//             <TableCell>{el.imageUrl}</TableCell>
//             <TableCell>{el.description}</TableCell>
//             <TableCell>
//                 <IconButton onClick={handleEdit} variant={'extendedFab'}><i className='material-icons'>
//                     edit
//                 </i></IconButton>
//                 {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
//                     {/*delete*/}
//                 {/*</i></IconButton>*/}
//                 <DeleteDialog />
//             </TableCell>
//         </TableRow>
//     ))
// );

const CategoryConcat = (category, handleEdit, handleDelete) => (
    category.map(el => (
        <TableRow key={el.SKU}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.category}</TableCell>
            <TableCell>{el.price}</TableCell>
            <TableCell>{el.currency}</TableCell>
            <TableCell>{el.SKU}</TableCell>
            <TableCell>{el.imageUrl}</TableCell>
            <TableCell>{el.description}</TableCell>
            <TableCell>
                <IconButton onClick={handleEdit} variant={'extendedFab'}><i className='material-icons'>
                    edit
                </i></IconButton>
                {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
                {/*delete*/}
                {/*</i></IconButton>*/}
                <DeleteDialog sku={el.SKU} />
            </TableCell>
        </TableRow>
    ))
);

const CategoryRows = (category, handleEdit, handleDelete) => {
    const result = category.map(el => el.map(el => (
        <TableRow key={el.SKU}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.category}</TableCell>
            <TableCell>{el.price}</TableCell>
            <TableCell>{el.currency}</TableCell>
            <TableCell>{el.SKU}</TableCell>
            <TableCell>{el.imageUrl}</TableCell>
            <TableCell>{el.description}</TableCell>
            <TableCell>
                <IconButton onClick={handleEdit} variant={'extendedFab'}><i className='material-icons'>
                    edit
                </i></IconButton>
                <IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>
                    delete
                </i></IconButton>
            </TableCell>
        </TableRow>
    )));
    return result;
};

class DeleteDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
        console.log(this.props.sku);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {/*<Button variant='outlined' onClick={this.handleClickOpen}>*/}
                    {/*Open alert dialog*/}
                {/*</Button>*/}
                <IconButton onClick={this.handleClickOpen} variant={'extendedFab'}><i className='material-icons'>
                    delete
                </i></IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>{'Delete'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Delete selected product from database. This action is permanent.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary' autoFocus >
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color='primary'>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

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
            // remove '-' from name
            let name = [...category];
            name = name.filter(el => el !== '-').join('');
            this.setState({
                [name]: result
            });
        });
    };

    handleEdit = (event) => {
        console.log(event.currentTarget);
        console.log(this);
    };

    handleDelete = (event) => {
        console.log(event.target);
        console.log(this);
    };

    render() {
        const {classes} = this.props;

        const allProducts = this.state.hoodie
            .concat(this.state.tshirt)
            .concat(this.state.tanktop)
            .concat(this.state.jumper)
            .concat(this.state.windbreaker);

        // a to ??
        // const allProducts = Object.keys(this.state).reduce((prev, curr) => (
        //  prev.concat(this.state[curr])
        // ));

        // const productsArr = Object.values(this.state);
        // console.log(productsArr);
        console.log(allProducts);

        let result;
        if (allProducts.length > 0) {
            // const rows = CategoryRows(productsArr, this.handleEdit, this.handleDelete);
            const rows = CategoryConcat(allProducts, this.handleEdit, this.handleDelete);
            result = (
                <React.Fragment>
                    <Paper className={classes.root}>
                        <Table>
                            <TableBody>
                                {rows}
                            </TableBody>
                        </Table>
                    </Paper>
                </React.Fragment>
            );
        } else {
            result = <CircularProgress />;
        }

        return result;
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