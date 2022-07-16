import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class HistoricPurchase1611959375001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'historicPurchase',
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
                        name: "product_name",
                        type: "varchar",                     
                    },
                    {
                        name: "amount",
                        type: "float",
                    },
                    {
                        name: "image",
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
        await queryRunner.createForeignKey('historicPurchase', new TableForeignKey({
            columnNames: ['child_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'children',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('historicPurchase');
    }


}
