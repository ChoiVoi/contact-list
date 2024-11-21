import React, { useEffect, useState } from "react";
import '../App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        name: true,
        email: true,
        phone: true,
        username: true,
        website: true,
        address: true,
        company: true
    });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setContacts(data))
    }, []);

    const handleFilterChange = (field) => {
        setFilters(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const getFilteredContacts = () => {
        if (!searchTerm) return contacts;
        
        return contacts.filter(contact => {
            const addressString = `${contact.address.suite} ${contact.address.street} ${contact.address.city} ${contact.address.zipcode}`;
            const companyString = `${contact.company.name} ${contact.company.catchPhrase} ${contact.company.bs}`;
            
            return (
                (filters.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.username && contact.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.website && contact.website.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.address && addressString.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filters.company && companyString.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
    };

    return (
        <div className="contacts-container">
            <Typography 
                variant="h2" 
                className="contacts-title"
            >
                Contacts
            </Typography>

            <Box className="search-filter-container">
                <TextField
                    label="Search Contacts"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                <FormGroup row className="filter-options">
                    <FormControlLabel
                        control={<Checkbox checked={filters.name}
                        onChange={() => handleFilterChange('name')} />}
                        label="Name"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.email}
                        onChange={() => handleFilterChange('email')} />}
                        label="Email"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.phone}
                        onChange={() => handleFilterChange('phone')} />}
                        label="Phone"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.username}
                        onChange={() => handleFilterChange('username')} />}
                        label="Username"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.website}
                        onChange={() => handleFilterChange('website')} />}
                        label="Website"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.address}
                        onChange={() => handleFilterChange('address')} />}
                        label="Address"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={filters.company}
                        onChange={() => handleFilterChange('company')} />}
                        label="Company"
                    />
                </FormGroup>
            </Box>
            
            <div className="contacts-grid">
                {getFilteredContacts().map((contact) => (
                    <Card 
                        key={contact.id} 
                        className="contact-card"
                    >
                        <CardContent>
                            <Typography 
                                variant="h5" 
                                component="div" 
                                gutterBottom 
                                className="contact-name"
                            >
                                {contact.name}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Email:</strong> {contact.email}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Phone:</strong> {contact.phone}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Username:</strong> {contact.username}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Website:</strong> {contact.website}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Address:</strong> {`${contact.address.suite}, ${contact.address.street}, ${contact.address.city}, ${contact.address.zipcode}`}
                            </Typography>
                            
                            <Typography variant="body2">
                                <strong>Company:</strong> {contact.company.name}
                            </Typography>

                            <Typography variant="body2">
                                <strong>Catch Phrase:</strong> {contact.company.catchPhrase}
                            </Typography>

                            <Typography variant="body2">
                                <strong>BS:</strong> {contact.company.bs}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Contacts;