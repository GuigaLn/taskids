import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateChildren1605228938679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'children',
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
                        name: "currency",
                        type: "varchar",                     
                    },
                    {
                        name: "value",
                        type: "float",   
                        default: 0,                  
                    },
                    {
                        name: "avatar",
                        type: "varchar",  
                        isNullable: true,                   
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp", 
                        default: 'now()',
                    },
                    {
                        name: "updated_at",
                        type: "timestamp", 
                        default: 'now()',
                    }
                ]
            }),
        );
        await queryRunner.createForeignKey('children', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('children');
    }

}
