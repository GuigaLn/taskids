import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateTask1605230389655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
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
                        name: "amount",
                        type: "float",
                    },
                    {
                        name: "answer",
                        type: "boolean",
                    },
                    {
                        name: "answer_text",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "realized",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "child_id",
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
        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            columnNames: ['child_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'children',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }

}
