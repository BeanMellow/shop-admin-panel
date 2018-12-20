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
        // margin: '0 auto',
        // margin: `${theme.spacing.unit *3} auto`,
        marginTop: theme.spacing.unit * 4,
        margin: 'auto'
        // textAlign: 'center',
    },
    tableWrapper: {
        overflowX: 'auto'
    }
    // smallCol: {
    //     width: 1
    // }
});

const TableHeader = (props) => {
    const headings = [
        'Name',
        'Category',
        'Price',
        'Currency',
        'SKU',
        'Image URL',
        'Description',
        'Action'
    ];

    const arrow = (
        <i className="material-icons">
            arrow_downward
        </i>
    );

    return (
        <TableRow>
            {headings.map(heading => (
                <TableCell key={heading} align={'center'}>
                    {heading}
                    {props.sort.category === heading && arrow}
                </TableCell>
            ))}
        </TableRow>
    );
};

const ProductRows = props => (
    props.allProducts.map(product => (
        <TableRow key={product.SKU}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.currency}</TableCell>
            <TableCell>{product.SKU}</TableCell>
            <TableCell>{product.imageUrl}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
                <IconButton onClick={props.handleEdit} variant={'extendedFab'}><i className='material-icons'>
                    edit
                </i></IconButton>
                {/*<EditDialog SKU={product.SKU} category={product.category} name={product.name} handleEdit={props.handleEdit}/>*/}
                {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
                {/*delete*/}
                {/*</i></IconButton>*/}
                <DeleteDialog SKU={product.SKU} category={product.category} name={product.name}
                              handleDelete={props.handleDelete}/>
            </TableCell>
        </TableRow>
    ))
);

// const ProductRows = withStyles(styles)(props => (
//     props.allProducts.map(product => (
//         <TableRow key={product.SKU}>
//             <TableCell className={props.classes.smallCol}>{product.name}</TableCell>
//             <TableCell>{product.category}</TableCell>
//             <TableCell>{product.price}</TableCell>
//             <TableCell>{product.currency}</TableCell>
//             <TableCell>{product.SKU}</TableCell>
//             <TableCell>{product.imageUrl}</TableCell>
//             <TableCell>{product.description}</TableCell>
//             <TableCell>
//                 <IconButton onClick={props.handleEdit} variant={'extendedFab'}><i className='material-icons'>
//                     edit
//                 </i></IconButton>
//                 {/*<EditDialog SKU={product.SKU} category={product.category} name={product.name} handleEdit={props.handleEdit}/>*/}
//                 {/*<IconButton onClick={handleDelete} variant={'extendedFab'}><i className='material-icons'>*/}
//                 {/*delete*/}
//                 {/*</i></IconButton>*/}
//                 <DeleteDialog SKU={product.SKU} category={product.category} name={product.name}
//                               handleDelete={props.handleDelete}/>
//             </TableCell>
//         </TableRow>
//     ))
// ));

class DeleteDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <IconButton onClick={this.handleClickOpen} variant={'extendedFab'}><i className='material-icons'>
                    delete
                </i></IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    // aria-labelledby='alert-dialog-title'
                    // aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='delete-dialog-title'>Delete {this.props.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='delete-dialog-description'>
                            Delete selected product from database (SKU: {this.props.SKU}). This action is permanent.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary' autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleDelete(this.props.SKU, this.props.category)} color='primary'>
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
        allProducts: [],
        sort: {
            type: 'num',
            category: 'SKU',
            direction: 'asc'
        }

    };
    // dzisiaj - all in one
    getDataFromDb = categories => {
        const result = [];
        categories.forEach(category => {
            db.collection(category).get().then(product => {
                product.forEach(property => result.push(property.data()));
                this.setState({
                    allProducts: result
                });
            });
        });
    };

    handleEdit = () => {
        console.log(this.state.allProducts);
        // this.handleNumericSort('price', 'asc');
        console.log(Object.values(this.state.sort));
        this.handleSort(Object.values(this.state.sort));
    };

    handleDelete = (SKU, category) => () => {
        const newAllProducts = this.state.allProducts.filter(product => product.SKU !== SKU);
        this.setState({
            allProducts: newAllProducts
        });

        db.collection(category).doc(SKU).delete()
            .then(() => console.log('Product successfully deleted.'))
            .catch(error => console.log('Error removing product: ', error));
    };

    handleSort = (type, column, direction) => {
        let newAllProducts = [...this.state.allProducts];

        if (type === 'numeric') {
            if (direction === 'desc') {
                newAllProducts = newAllProducts.sort((a, b) => parseInt(b[column]) - parseInt(a[column]));
            } else if (direction === 'asc') {
                newAllProducts = newAllProducts.sort((a, b) => parseInt(a[column]) - parseInt(b[column]));
            }
        } else if (type === 'alphabetic') {
            if (direction === 'desc') {
                newAllProducts = newAllProducts.sort((a, b) => {
                    if (a[column] > b[column]) {
                        return -1;
                    }
                    if (a[column] < b[column]) {
                        return 1;
                    }
                    return 0;
                });
            } else if (direction === 'asc') {
                newAllProducts = newAllProducts.sort((a, b) => {
                    if (a[column] < b[column]) {
                        return -1;
                    }
                    if (a[column] > b[column]) {
                        return 1;
                    }
                    return 0;
                });
            }
        }

        console.log(newAllProducts);
        this.setState({
            allProducts: newAllProducts
        });
    };

    render() {
        const {classes} = this.props;

        let result;
        if (this.state.allProducts.length > 0) {
            result = (
                <React.Fragment>
                    <Paper className={classes.root}>
                        <div className={classes.tableWrapper}>
                            <Table>
                                <TableHead>
                                    <TableHeader sort={this.state.sort} />
                                </TableHead>
                                <TableBody>
                                    <ProductRows allProducts={this.state.allProducts}
                                                 handleEdit={this.handleEdit}
                                                 handleDelete={this.handleDelete}
                                    />
                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                </React.Fragment>
            );
        } else {
            result = <CircularProgress/>;
        }

        return result;
    }

    componentDidMount() {
        this.getDataFromDb(['hoodie', 'jumper', 't-shirt', 'tank-top', 'windbreaker']);

    }
}

export default withStyles(styles)(ShowProducts);