import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1605211944190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment", 
                    },
                    {
                        name: "name",
                        type: "varchar",                       
                    },
                    {
                        name: "email",
                        type: "varchar",  
                        isUnique: true,                     
                    },
                    {
                        name: "password",
                        type: "varchar",                       
                    },
                    {
                        name: "phone",
                        type: "varchar",                       
                    },
                    {
                        name: "created_at",
                        type: "timestamp", 
                        default: 'now()',
                    },
                    {
                        name: "license_at",
                        type: "timestamp", 
                        default: 'now() + \'7 days\'::interval day',
                    },
                    {
                        name: "updated_at",
                        type: "timestamp", 
                        default: 'now()',
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
