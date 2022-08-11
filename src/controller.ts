import e, {Request,response,Response} from 'express';
import fs from 'fs/promises';
import {User} from '../public/user';
import {pool} from './queries.js';

class controller {

    public async getAll(req:Request, res:Response) {
        pool.query(`SELECT users.*,customer.name AS customer,role.name AS role  FROM users 
        LEFT JOIN customer ON users.id = customer.id LEFT JOIN role 
        ON  customer.id= role.id;`,
        (error: any,result: any)=>
        {
            if(error)
            {
                throw error;
                
            }

            else
            {
                res.status(200).json(result.rows);
            }
        }
        );
       
    }

    public async getUserById(req: Request, res: Response) {
        const id = Number(req.params.id);
        pool.query(`SELECT users.*,customer.name AS customer,role.name AS role  FROM users 
        LEFT JOIN customer ON users.id = customer.id LEFT JOIN role 
        ON  customer.id= role.id WHERE users.id = $1`,
        [id], (error,result) =>
        {
            if(error)
            {
                res.status(404).send("You have entered wrong id");
            }
            else
            {
                res.status(200).json(result.rows);
            }
        }
        );
    }
    

    public async createUser(req: Request, res: Response) {
        const {firstName,middleName,lastName,email,phone,address,role,customer} = req.body;
        pool.query(`INSERT INTO users(firstname,middlename,lastname,email,phone,
            address,customer,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [firstName,middleName,lastName,email,phone,address,role,customer],(err,result)=>
        {
            if(err)
            {
                throw err;
            }
            else
            {
                res.status(201).send("User added successfully");
            }
        }
        ); 
         
    }
    
    public async updateUser(req: Request, res: Response) {

        const id = Number(req.params.id);
        const {firstName,middleName,lastName,email,phone,address,role,customer} = req.body;
        pool.query(`UPDATE users SET firstname = $1, middlename = $2, lastname = $3, email = $4,
         phone = $5, role = $7,customer = $8,address = $6 WHERE id = $9`,
        [firstName,middleName,lastName,email,phone,address,role,customer,id],(err,result) =>
        {
            if(err)
            {
                res.status(400).send("Failed due to bad input");
                throw err;
            }
            else{
                res.status(200).send("Updated");
            }
        }
        );
    }
    public async deleteUser(req: Request, res: Response) {
       
        const id = Number(req.params.id);
        pool.query('DELETE FROM users WHERE id = $1',[id],(err,result)=>
        {
            if(err)
            {
                throw err;
            }
            else
            {
                res.status(200).send("Deleted");
            }
        });
     
    }
  
}

export const userController = new controller();
