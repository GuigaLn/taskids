import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateReward1606132076469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rewards',
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
                        name: "title",
                        type: "varchar",                       
                    },
                    {
                        name: "description",
                        type: "varchar",                     
                    },
                    {
                        name: "value",
                        type: "float",   
                        default: 0,                  
                    },
                    {
                        name: "filename",
                        type: "varchar",                     
                    },
                    {
                        name: "image",
                        type: "varchar",                     
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
        await queryRunner.createForeignKey('rewards', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rewards');
    }

}
