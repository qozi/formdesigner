define(['m/ColumnModel', 'm/FieldModel'], function(ColumnModel, FieldModel) {

	return describe("测试ColumnModel", function() {

		var model = null;

		beforeEach(function() {
			model = new ColumnModel();
		});

		afterEach(function() {
			model = null;
		});

		it("默认数据必须是这样:{index: 0, width:1, content: FieldModel}",
			function() {
				expect(model.get('index')).toBe(0);
				expect(model.get('width')).toBe(0.0);
				expect(model.constructor === ColumnModel);

				var content = model.get('content');
				expect(content.constructor === FieldModel);
			});
		
		it("嵌套Model的序列化和json格式一致",
			function() {
				var json = model.toJSON();
				expect(json).toEqual({
					index: 0,
					width: 0.0,
					selected: false,
					content: {
						id: '',
						name: '',
						label: '',
						type: 'text',
						value: '',// 可能是object
						required: false,
						used: true
					}
				});

			});

		it("测试setContent & getContent",
			function() {
				var newField = new FieldModel({
					id:'title_field',
					name: 'title',
					label: 'Title'
				});
				
				var changedSpy = jasmine.createSpy('changedSpy');
				model.bind('change:content', changedSpy);

				model.setContent(newField);
				expect(changedSpy).toHaveBeenCalled();

				var ret = model.getContent();
				expect(ret).toBe(newField);

				var json = model.toJSON();
				expect(json).toEqual({
					index: 0,
					width: 0.0,
					selected: false,
					content: {
						id:'title_field',
						name: 'title',
						label: 'Title',
						type: 'text',
						value: '',// 可能是object
						required: false,
						used: true 
					}
				});
			});

		it('使用json直接初始化ColumnModel', 
			function() {
				var config = {
					index: 0,
					width: 1.0,
					selected: false,
					content: {
						id:'title_field',
						name: 'title',
						label: 'Title',
						type: 'text',
						value: '',// 可能是object
						required: false,
						used: true
					}
				};

				var column = new ColumnModel(config);
				var json = column.toJSON();
				expect(json).toEqual(config);

				var content = column.getContent();
				expect(content.constructor === FieldModel);
				expect(content.parent === column);
			});

	});
});
